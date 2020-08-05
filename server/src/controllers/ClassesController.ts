import { Request, Response } from "express";

import db from "../database/connection";
import convertHourToMinutes from "../utils/convertHourToMinutes";

interface scheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassController {
  async index(req: Request, res: Response) {
    const filters = req.query;


    const subject = filters.subject as string;
    const time = filters.time as string;
    const week_day = filters.week_day as string;

    if(!filters.subject || !filters.week_day || !filters.time){
        return res.status(400).json({
            error: "Nem um paraêmetro encontrado para pesquisa"
        });
    }

    const timeInMinutes = convertHourToMinutes(time);

    try {
      const classes = await db('classes')
      .whereExists(function () {
          this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', "=", subject)
      .join('users', 'classes.user_id', '=', 'users.id');
      return res.json(classes);


    } catch (error) {
      console.log(error)
      return res.status(404).json({ok: error});
    }



  }

  async store(req: Request, res: Response) {
    const { name, avatar, whatsapp, bio, cost, schedule, subject } = req.body;
    const trx = await db.transaction();

    try {
      const user = await trx("users").insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const user_id = user[0];

      const classes = await trx("classes").insert({
        subject,
        cost,
        user_id,
      });

      const class_id = classes;

      const classSchedule = schedule.map((item: scheduleItem) => {
        return {
          class_id,
          week_day: item.week_day,
          from: convertHourToMinutes(item.from),
          to: convertHourToMinutes(item.to),
        };
      });

      await trx("class_schedule").insert(classSchedule);

      trx.commit();
      return res.status(201).send();
    } catch (error) {
      trx.rollback();
      return res.status(400).json({ erro: "Erro Ao criar" });
    }
  }
}
