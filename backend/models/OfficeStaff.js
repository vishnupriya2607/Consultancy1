import mongoose from 'mongoose';

const OfficeStaffSchema = new mongoose.Schema({
  name: String,
  qualification: String,
  designation: String,
});

const OfficeStaff = mongoose.model('OfficeStaff', OfficeStaffSchema,'office_staff');
export default OfficeStaff;
