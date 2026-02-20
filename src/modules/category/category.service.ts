import { prisma } from "../../lib/prisma";

const createCategory = async (payload: {
  title: string;
  description?: string;
}) => {
  return prisma.category.create({
    data: payload,
  });
};


export const CategoryService = {
  createCategory,

};
