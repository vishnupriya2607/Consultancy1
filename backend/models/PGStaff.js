import mongoose from 'mongoose';

const PGStaffSchema = new mongoose.Schema({
  name: String,
  qualification: String,
  designation: String,
});

// explicitly define the collection name as "pg_staff"
const PGStaff = mongoose.model('PGStaff', PGStaffSchema, 'pg_staff');

export default PGStaff;
