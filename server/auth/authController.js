import { HTTP_STATUS } from '../config/config.js'
import User from '../modules/users/userModel.js'
import { comparePasswords, generateToken } from '../utils/helpers.js'

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validar que se ingresaron los campos necesarios
    if (!username || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Username y password son obligatorios' });
    }

    // Buscar usuario por su username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Datos incorrectos' });
    }

    // Comparar contraseñas usando la función segura
    const isCorrect = comparePasswords(password, user.password);
    if (!isCorrect) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Datos incorrectos' });
    }

    // Generar token JWT u otro mecanismo de autenticación
    const token = generateToken(user.username, user.nombres, user.apellidos, user.email);

    return res.status(HTTP_STATUS.ACCEPTED).json({ message: 'Has iniciado sesión', token });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Error interno del servidor' });
  }
};

