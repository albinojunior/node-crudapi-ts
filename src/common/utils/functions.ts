import { lstatSync, readdirSync } from "fs";
import { join } from "path";
import { DataTypes, DataType } from "sequelize";

export const isNumberType = (type: DataType): boolean =>
  type instanceof DataTypes.NUMBER;

export const isDateType = (type: DataType): boolean =>
  type instanceof DataTypes.DATE;

export const removeEspecialChars = (value: string): string =>
  value.replace(/\D/gi, "");

export const isDirectory = (source: string): boolean =>
  lstatSync(source).isDirectory();

export const getDirectories = (source: string): string[] =>
  readdirSync(source).filter(
    (name): boolean => isDirectory(join(source, name))
  );
