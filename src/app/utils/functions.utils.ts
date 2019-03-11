import { lstatSync, readdirSync } from "fs";
import { join } from "path";

import { NUMBER_TYPES } from '../common/Constraints';

export const isNumberType = (type: any): boolean => NUMBER_TYPES.filter(numberType => type instanceof numberType).length > 0;

export const removeEspecialChars = (value: string): string => value.replace(/\D/gi, "");

export const isDirectory = (source: string) => lstatSync(source).isDirectory();

export const getDirectories = (source: string): string[] => readdirSync(source).filter(name => isDirectory(join(source, name)));