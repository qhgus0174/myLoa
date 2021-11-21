import { IBackup } from "../../controllers/backup";
import { Backup } from "../../controllers/backup";
import express, { Request, Response } from "express";
import { IResponse } from "../../type/response";

const router = express.Router();

router.get("/:backupKey", async (req: Request, res: Response) => {
  const { backupKey } = req.params as Pick<IBackup, "backupKey">;

  try {
    const result = await Backup.getBackup({
      backupKey: backupKey,
    });

    res.status(201).send({
      status: "SUCCESS",
      result: result.rows[0],
    } as IResponse);
  } catch (e: unknown) {
    const { message } = e as Error;
    res.status(500).send({ status: "ERR", message: message } as IResponse);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { todo, todoOrd, character, characterOrd } = req.body as IBackup;
    const result = await Backup.createBackup({
      todo: todo,
      todoOrd: todoOrd,
      character: character,
      characterOrd: characterOrd,
    });
    res.status(201).send({
      status: "SUCCESS",
      result: result,
    } as IResponse);
  } catch (e: unknown) {
    const { message } = e as Error;
    res.status(500).send({ status: "ERR", message: message } as IResponse);
  }
});

router.delete("/delete/:backupKey", async (req: Request, res: Response) => {
  try {
    const { backupKey } = req.params as Pick<IBackup, "backupKey">;

    const result = await Backup.deleteBackup({
      backupKey: backupKey,
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
