const db = require('../services/FirebaseService');

// Thêm sinh viên mới
exports.createStudent = async (req, res) => {
    try {
      const { name, age, className } = req.body;
  
      // Kiểm tra nếu một trong các trường bị thiếu
      if (!name || !age || !className) {
        return res.status(400).json({ error: 'Missing fields: name, age, or className' });
      }
  
      const newStudent = await db.collection('students').add({
        name,
        age,
        className,
      });
      res.status(201).json({ id: newStudent.id, message: 'Student created successfully' });
    } catch (error) {
      console.error('Error creating student:', error);
      res.status(500).json({ error: 'Failed to create student' });
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
