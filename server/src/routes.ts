import express from "express";
import db from "./database/connection";
import convertHourToMinutes from "./utils/convertHourToMinutes";

const routes = express.Router();

interface scheduleItem {
  week_day: number;
  from: string;
  to: string;
}

routes.post("/classes", async (req, res) => {
  const { name, avatar, whatsapp, bio, cost, schedule, subject } = req.body;
  const trx = await db.transaction();

  try {
    const user = await trx("users").insert({
        name,
        avatar,
        whatsapp,
        bio,
      });
      
    
      const userId = user[0];
    
      const classes = await trx("classes").insert({
        subject,
        cost,
        user_id: userId,
      });
    
      const class_id = classes;
    
      const classSchedule = schedule.map((item: scheduleItem) => {
        return {
          class_id: 1,
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
      return res.status(400).json({erro: "Erro Ao criar"});
  }
  
});



export default routes;
