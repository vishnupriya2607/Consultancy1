import mongoose from 'mongoose';

const BTStaffSchema = new mongoose.Schema({
  name: String,
  qualification: String,
  designation: String,
});

const BTStaff = mongoose.model('BTStaff', BTStaffSchema, 'bt_staff');
export default BTStaff;

