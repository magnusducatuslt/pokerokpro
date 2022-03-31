import { ModelStatic } from "sequelize";
import { Model, BuildOptions } from "sequelize";

export type ModelType<T extends Model> = ModelStatic<T> & {
  new (values?: object, options?: BuildOptions): T;
  associate: (models: {
    [key: string]: typeof Model & {
      new (values?: object, options?: BuildOptions): any;
    };
  }) => void;
};
