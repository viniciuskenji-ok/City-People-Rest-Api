import { validation } from "../../shared/middleware";
import * as yup from "yup";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CitiesProvider } from "../../database/providers/cities";

interface IParamsProps {
    id?: number;
}

export const deleteCityValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const deleteCity = async (req: Request<IParamsProps>, res: Response): Promise<void> => {
    const result = await CitiesProvider.deleteById(req.params.id!);

    if(result instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        });
    }

    res.status(StatusCodes.NO_CONTENT).send()
}