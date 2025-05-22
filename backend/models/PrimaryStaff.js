import mongoose from 'mongoose';

const PrimaryStaffSchema = new mongoose.Schema({
  name: String,
  qualification: String,
  designation: String,
});

const PrimaryStaff = mongoose.model('PrimaryStaff', PrimaryStaffSchema, 'primary_staff');
export default PrimaryStaff;
