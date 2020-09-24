const oracledb = require('oracledb')
const dbConfig = require('./dbconfig')

let phoneNumber = '3571327360'

const query = `

            SELECT FECHA,
            round(sum(CONTENIDO_ADULTO +REDES_SOCIALES +COMERCIO_ELECTRONICO +ENTRETENIMIENTO + SALUD_EDUCACION_BIENESTAR +BUSQUEDAS_MAIL_TECNOLOGIA +NOTICIAS_DIARIOS_REVISTAS+ SERVICIOS_BANCA_FINANCIERAS + OTROS) over (partition by radius_calling_station_id),2) ACUMULADO_PERIODO,
            round(sum(CONTENIDO_ADULTO +REDES_SOCIALES +COMERCIO_ELECTRONICO +ENTRETENIMIENTO + SALUD_EDUCACION_BIENESTAR +BUSQUEDAS_MAIL_TECNOLOGIA +NOTICIAS_DIARIOS_REVISTAS+ SERVICIOS_BANCA_FINANCIERAS + OTROS) over (partition by radius_calling_station_id, fecha),2) ACUMULADO_TOTAL_DIARIO,
            round(sum(FACEBOOK) over (partition by radius_calling_station_id),2) ACUMULADO_FACEBOOK,
            round(sum(INSTAGRAM) over (partition by radius_calling_station_id),2) ACUMULADO_INSTAGRAM,
            round(sum(REDES_SOCIALES) over (partition by radius_calling_station_id),2) ACUMULADO_REDES_SOCIALES,
            round(sum(COMERCIO_ELECTRONICO) over (partition by radius_calling_station_id),2) ACUMULADO_COM_ELECTRONICO,
            round(sum(ENTRETENIMIENTO) over (partition by radius_calling_station_id),2) ACUMULADO_ENTRETENIMIENTO,
            round(sum(CONTENIDO_ADULTO) over (partition by radius_calling_station_id),2) ACUMULADO_CONTENIDO_ADULTO,
            round(sum(SALUD_EDUCACION_BIENESTAR) over (partition by radius_calling_station_id),2) ACUMULADO_SALUD,
            round(sum(BUSQUEDAS_MAIL_TECNOLOGIA) over (partition by radius_calling_station_id),2) ACUMULADO_TECNOLOGIA,
            round(sum(NOTICIAS_DIARIOS_REVISTAS) over (partition by radius_calling_station_id) ,2) ACUMULADO_NOTICIAS,
            round(sum(SERVICIOS_BANCA_FINANCIERAS) over (partition by radius_calling_station_id),2) ACUMULADO_FINANCIERAS,
            round(sum(OTROS) over (partition by radius_calling_station_id),2) ACUMULADO_OTROS,
            round(FACEBOOK,2) FACEBOOK,
            round(INSTAGRAM,2) INSTAGRAM,
            round(REDES_SOCIALES,2) REDES_SOCIALES,
            round(COMERCIO_ELECTRONICO,2) COMERCIO_ELECTRONICO,
            round(ENTRETENIMIENTO,2) ENTRETENIMIENTO,
            round(CONTENIDO_ADULTO,2) CONTENIDO_ADULTO,
            round(SALUD_EDUCACION_BIENESTAR,2) SALUD_EDUCACION_BIENESTAR,
            round(BUSQUEDAS_MAIL_TECNOLOGIA,2) BUSQUEDAS_MAIL_TECNOLOGIA,
            round(NOTICIAS_DIARIOS_REVISTAS,2) NOTICIAS_DIARIOS_REVISTAS,
            round(SERVICIOS_BANCA_FINANCIERAS,2) SERVICIOS_BANCA_FINANCIERAS,
            round(OTROS,2) OTROS
            FROM dracing.C0065_trafico_clientes_pec_ar
            where radius_calling_station_id = ${phoneNumber}
            and fecha >= to_date('01092020','ddmmyyyy')
`

async function run() {
	let connection

	try {
		connection = await oracledb.getConnection(dbConfig)
        const result = await connection.execute(query)
        return result
	} catch (err) {
		console.error(err)
	} finally {
		if (connection) {
			try {
				await connection.close()
			} catch (err) {
				console.error(err)
			}
		}
	}
}

module.exports = run
