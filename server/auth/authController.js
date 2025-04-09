import { HTTP_STATUS } from '../config/config.js'
import User from '../modules/users/userModel.js'
import { comparePasswords, encryptPassword, generateToken } from '../utils/helpers.js'

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validar que se ingresaron los campos necesarios
    if (!username || !password) {
      return res.status(400).json({ message: 'Username y password son obligatorios' });
    }

    // Buscar usuario por su username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: 'Datos incorrectos: usuario no existe' });
    }

    // Comparar contraseñas usando la función segura
    const isCorrect = comparePasswords(password, user.password);
    if (!isCorrect) {
      return res.status(401).json({ message: 'Datos incorrectos: contraseña incorrecta' });
    }

    // Generar token JWT u otro mecanismo de autenticación
    const token = generateToken(user.username, user.nombres, user.apellidos, user.email);

    return res.status(200).json({ message: 'Has iniciado sesión', token });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

