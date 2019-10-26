const moment = require('moment');
const { Op } = require('sequelize');
const { Appointment } = require('../models');

class AppointmentController {
  async index(req, res) {
    const date = moment(parseInt(req.query.date));

    const appointment = await Appointment.findAll({
      where: {
        provider_id: req.params.provider,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format(),
          ],
        },
      },
    });
  }
}

module.exports = new AppointmentController();
