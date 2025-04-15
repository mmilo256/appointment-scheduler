import { formatDate } from "../utils/helpers";

const emailTemplate = (data, response = "") => {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Derivación de Audiencia</title>
</head>
<body style="background-color:#f4f4f4; font-family:Arial, sans-serif; margin:0; padding:0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:6px; box-shadow:0 2px 5px rgba(0,0,0,0.1); overflow:hidden;">
          <tr>
            <td style="background-color:#1e3a8a; color:#ffffff; text-align:center; padding:20px;">
              <h1 style="margin:0; font-size:24px;">Derivación de Audiencia</h1>
              <p style="margin:5px 0 0; font-size:14px;">Se ha derivado la siguiente audiencia a su dirección</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px;">
              <h2 style="font-size:18px; color:#333333; margin-bottom:10px;">Datos del Ciudadano</h2>
              <p style="margin:4px 0;"><strong>Nombre:</strong> ${data.ciudadano?.nombres} ${data.ciudadano?.apellidos}</p>
              <p style="margin:4px 0;"><strong>RUT:</strong> ${data.ciudadano?.rut}</p>
              ${data.ciudadano?.email ? `<p style="margin:4px 0;"><strong>Email:</strong> ${data.ciudadano?.email}</p>` : ""}
              <p style="margin:4px 0;"><strong>Teléfono:</strong> ${data.ciudadano?.telefono}</p>
              ${data.ciudadano?.telefono_2 ? `<p style="margin:4px 0;"><strong>Teléfono:</strong> ${data.ciudadano?.telefono_2}</p>` : ""}

              <h2 style="font-size:18px; color:#333333; margin-top:20px; margin-bottom:10px;">Información de la Audiencia</h2>
              <p style="margin:4px 0;"><strong>Materia:</strong> ${data.materia}</p>
              <p style="margin:4px 0;"><strong>Fecha y hora:</strong> ${formatDate(data.createdAt, "DD MMM YYYY, HH:mm")}</p>
              <p style="margin:4px 0;"><strong>Nota del alcalde:</strong> ${response}</p>

              <p style="margin-top:20px; font-size:12px; color:#777777;">Este correo fue generado automáticamente. No responda a este mensaje.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

export default emailTemplate;