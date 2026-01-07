import dotenv from 'dotenv';
dotenv.config(); // Load .env

import mongoose from 'mongoose';
import connectDB from '../config/database.config';
import RoleModel from '../models/roles-permission.model';
import { RolePermissions } from '../utils/role-permission'; // Added: Import real permissions
import { Roles } from '../enums/role.enum';

const useTransaction = process.env.NODE_ENV === 'production';

const seedRoles = async () => {
  console.log('Seeding roles started...');

  try {
    // Await connection before any ops
    await connectDB();
    console.log('Connected to Mongo database');

    if (useTransaction) {
      const session = await mongoose.startSession();
      try {
        await session.withTransaction(async () => {
          console.log('Clearing existing roles... (transactional)');
          await RoleModel.deleteMany({}).session(session);

          // Insert default roles with real permissions
          const ownerRole = new RoleModel({
            name: Roles.OWNER,
            permissions: RolePermissions.OWNER, // Use enum array
          });
          await ownerRole.save({ session });

          const adminRole = new RoleModel({
            name: Roles.ADMIN,
            permissions: RolePermissions.ADMIN,
          });
          await adminRole.save({ session });

          const memberRole = new RoleModel({
            name: Roles.MEMBER,
            permissions: RolePermissions.MEMBER,
          });
          await memberRole.save({ session });

          console.log('Roles seeded successfully (transactional).');
        });
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        await session.endSession();
      }
    } else {
      // Non-transactional fallback (dev mode)
      console.log('[INFO] Skipping transactions in dev mode - using sequential ops for seeding.');

      console.log('Clearing existing roles...');
      await RoleModel.deleteMany({});

      // Idempotent inserts with real permissions
      let existingOwner = await RoleModel.findOne({ name: Roles.OWNER });
      if (!existingOwner) {
        const ownerRole = new RoleModel({
          name: Roles.OWNER,
          permissions: RolePermissions.OWNER,
        });
        await ownerRole.save();
        console.log('Owner role created.');
      }

      let existingAdmin = await RoleModel.findOne({ name: Roles.ADMIN });
      if (!existingAdmin) {
        const adminRole = new RoleModel({
          name: Roles.ADMIN,
          permissions: RolePermissions.ADMIN,
        });
        await adminRole.save();
        console.log('Admin role created.');
      }

      let existingMember = await RoleModel.findOne({ name: Roles.MEMBER });
      if (!existingMember) {
        const memberRole = new RoleModel({
          name: Roles.MEMBER,
          permissions: RolePermissions.MEMBER,
        });
        await memberRole.save();
        console.log('Member role created.');
      }

      console.log('Roles seeded successfully (dev mode).');
    }
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  } finally {
    // Close connection after seeding
    await mongoose.connection.close();
  }
};

// Run if direct
if (require.main === module) {
  (async () => {
    await seedRoles();
    process.exit(0);
  })();
}

export default seedRoles;