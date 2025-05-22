import mongoose from 'mongoose';

const SGTStaffSchema = new mongoose.Schema({
  name: String,
  qualification: String,
  designation: String,
});

const SGTStaff = mongoose.model('SGTStaff', SGTStaffSchema, 'sgt_staff');
export default SGTStaff;
