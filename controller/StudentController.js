const db = require('../services/FirebaseService');

// Thêm sinh viên mới
// Thêm sinh viên mới
exports.createStudent = async (req, res) => {
    try {
      const student = req.body;  // Nhận dữ liệu từ request body
  
      // Thêm student vào collection 'students'
      const docRef = await db.collection('students').add(student);
      
      // Trả về kết quả thành công với ID của document vừa tạo
      res.status(201).send({ id: docRef.id, message: 'Student created successfully' });
    } catch (error) {
      // Trả về lỗi nếu không thêm được sinh viên
      res.status(500).send('Error creating student: ' + error.message);
    }
};

  
// Lấy danh sách sinh viên
exports.getStudents = async (req, res) => {
  try {
    const studentsRef = db.collection('students');
    const snapshot = await studentsRef.get();
    const students = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve students' });
  }
};

// Lấy thông tin chi tiết sinh viên
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await db.collection('students').doc(id).get();
    if (!student.exists) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student.data());
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve student' });
  }
};

// Cập nhật thông tin sinh viên
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, className } = req.body;
    await db.collection('students').doc(id).update({ name, age, className });
    res.status(200).json({ message: 'Student updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student' });
  }
};

// Xóa sinh viên
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('students').doc(id).delete();
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student' });
  }
};
