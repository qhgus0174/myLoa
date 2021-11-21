import { IWeeklyContents } from "../../controllers/weeklyContents";
import { WeeklyContents } from "../../controllers/weeklyContents";
import express, { Request, Response } from "express";
import { IResponse } from "../../type/response";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await WeeklyContents.getWeeklyContents();

    res.status(201).send({
      status: "SUCCESS",
      result: result.rows[0],
    } as IResponse);
  } catch (e: unknown) {
    const { message } = e as Error;
    res.status(500).send({ status: "ERR", message: message } as IResponse);
  }
});

router.put("/edit", async (req: Request, res: Response) => {
  try {
    const { guardian, abyss } = req.body as Pick<
      IWeeklyContents,
      "guardian" | "abyss"
    >;

    await WeeklyContents.updateWeeklyContents({
      guardian: guardian,
      abyss: abyss,
    });

    res.status(201).send({
      status: "SUCCESS",
    } as IResponse);
  } catch (e: unknown) {
    const { message } = e as Error;
    res.status(500).send({ status: "ERR", message: message } as IResponse);
  }
});

export = router;
