import mongoose, { Types } from "mongoose";
import UserModel from "../models/user.model";
import AccountModel from "../models/account.model";
import WorkspaceModel from "../models/workspace.model";
import RoleModel from "../models/roles-permission.model";
import { Roles } from "../enums/role.enum";
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from "../utils/appError";
import MemberModel from "../models/member.model";
import { ProviderEnum } from "../enums/account-provider.enum";

export const loginOrCreateAccountService = async (data: {
  provider: string;
  displayName: string;
  providerId: string;
  picture?: string;
  email?: string;
}) => {
  const { providerId, provider, displayName, email, picture } = data;

  const useTransaction = process.env.NODE_ENV === 'production';

  try {
    if (useTransaction) {
      const session = await mongoose.startSession();
      try {
        await session.withTransaction(async () => {
          let user = await UserModel.findOne({ email }).session(session);

          if (!user) {
            // Create a new user if it doesn't exist
            user = new UserModel({
              email,
              name: displayName,
              profilePicture: picture || null,
            });
            await user.save({ session });

            const account = new AccountModel({
              userId: user._id,
              provider: provider,
              providerId: providerId,
            });
            await account.save({ session });

            // 3. Create a new workspace for the new user
            const workspace = new WorkspaceModel({
              name: `My Workspace`,
              description: `Workspace created for ${user.name}`,
              owner: user._id,
            });
            await workspace.save({ session });

            const ownerRole = await RoleModel.findOne({
              name: Roles.OWNER,
            }).session(session);

            if (!ownerRole) {
              throw new NotFoundException("Owner role not found");
            }

            const member = new MemberModel({
              userId: user._id,
              workspaceId: workspace._id,
              role: ownerRole._id,
              joinedAt: new Date(),
            });
            await member.save({ session });

            user.currentWorkspace = workspace._id as Types.ObjectId;
            await user.save({ session });
          }
        });
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        await session.endSession();
      }
    } else {
      // Non-transactional fallback (dev mode)
      console.log('[INFO] Skipping transactions in dev mode - using sequential saves for loginOrCreateAccountService.');

      let user = await UserModel.findOne({ email });

      if (!user) {
        // Create a new user if it doesn't exist
        user = new UserModel({
          email,
          name: displayName,
          profilePicture: picture || null,
        });
        await user.save();

        const account = new AccountModel({
          userId: user._id,
          provider: provider,
          providerId: providerId,
        });
        await account.save();

        // 3. Create a new workspace for the new user
        const workspace = new WorkspaceModel({
          name: `My Workspace`,
          description: `Workspace created for ${user.name}`,
          owner: user._id,
        });
        await workspace.save();

        const ownerRole = await RoleModel.findOne({
          name: Roles.OWNER,
        });

        if (!ownerRole) {
          throw new NotFoundException("Owner role not found");
        }

        const member = new MemberModel({
          userId: user._id,
          workspaceId: workspace._id,
          role: ownerRole._id,
          joinedAt: new Date(),
        });
        await member.save();

        user.currentWorkspace = workspace._id as Types.ObjectId;
        await user.save();
      }
    }

    // Fetch the final user after operation (consistent for both modes)
    const finalUser = await UserModel.findOne({ email });
    if (!finalUser) {
      throw new NotFoundException("User not found after creation/login");
    }

    console.log("End Session...");

    return { user: finalUser };
  } catch (error) {
    throw error;
  }
};

export const registerUserService = async (body: {
  email: string;
  name: string;
  password: string;
}) => {
  const { email, name, password } = body;
  const useTransaction = process.env.NODE_ENV === 'production';

  try {
    if (useTransaction) {
      const session = await mongoose.startSession();
      try {
        await session.withTransaction(async () => {
          const existingUser = await UserModel.findOne({ email }).session(session);
          if (existingUser) {
            throw new BadRequestException("Email already exists");
          }

          const user = new UserModel({
            email,
            name,
            password,
          });
          await user.save({ session });

          const account = new AccountModel({
            userId: user._id,
            provider: ProviderEnum.EMAIL,
            providerId: email,
          });
          await account.save({ session });

          // 3. Create a new workspace for the new user
          const workspace = new WorkspaceModel({
            name: `My Workspace`,
            description: `Workspace created for ${user.name}`,
            owner: user._id,
          });
          await workspace.save({ session });

          const ownerRole = await RoleModel.findOne({
            name: Roles.OWNER,
          }).session(session);

          if (!ownerRole) {
            throw new NotFoundException("Owner role not found");
          }

          const member = new MemberModel({
            userId: user._id,
            workspaceId: workspace._id,
            role: ownerRole._id,
            joinedAt: new Date(),
          });
          await member.save({ session });

          user.currentWorkspace = workspace._id as Types.ObjectId;
          await user.save({ session });
        });
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        await session.endSession();
      }
    } else {
      // Non-transactional fallback (dev mode)
      console.log('[INFO] Skipping transactions in dev mode - using sequential saves for registerUserService.');

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        throw new BadRequestException("Email already exists");
      }

      const user = new UserModel({
        email,
        name,
        password,
      });
      await user.save();

      const account = new AccountModel({
        userId: user._id,
        provider: ProviderEnum.EMAIL,
        providerId: email,
      });
      await account.save();

      // 3. Create a new workspace for the new user
      const workspace = new WorkspaceModel({
        name: `My Workspace`,
        description: `Workspace created for ${user.name}`,
        owner: user._id,
      });
      await workspace.save();

      const ownerRole = await RoleModel.findOne({
        name: Roles.OWNER,
      });

      if (!ownerRole) {
        throw new NotFoundException("Owner role not found");
      }

      const member = new MemberModel({
        userId: user._id,
        workspaceId: workspace._id,
        role: ownerRole._id,
        joinedAt: new Date(),
      });
      await member.save();

      user.currentWorkspace = workspace._id as Types.ObjectId;
      await user.save();
    }

    // Fetch the final user after operation (consistent for both modes)
    const finalUser = await UserModel.findOne({ email });
    if (!finalUser) {
      throw new NotFoundException("User not found after registration");
    }

    console.log("End Session...");

    return {
      userId: finalUser._id,
      workspaceId: finalUser.currentWorkspace as Types.ObjectId,
    };
  } catch (error) {
    throw error;
  }
};

export const verifyUserService = async ({
  email,
  password,
  provider = ProviderEnum.EMAIL,
}: {
  email: string;
  password: string;
  provider?: string;
}) => {
  const account = await AccountModel.findOne({ provider, providerId: email });
  if (!account) {
    throw new NotFoundException("Invalid email or password");
  }

  const user = await UserModel.findById(account.userId);

  if (!user) {
    throw new NotFoundException("User not found for the given account");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthorizedException("Invalid email or password");
  }

  return user.omitPassword();
};