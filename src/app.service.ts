import { Injectable } from '@nestjs/common';
import { PrismaService } from "./prisma.service";
import { CreateTransactionDto } from "./dto/createTransaction.dto";
import { UpdateTransactionDto } from "./dto/updateTransaction.dto";

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

    async createTransaction(data: CreateTransactionDto){
      const transaction = await this.prismaService.transaction.create({data})
      return transaction;
    }

    async getAllTransactions(){
      const transactions = await this.prismaService.transaction.findMany({
        orderBy: {
          createdAt: 'asc',
        }
      });
      return transactions;
    }

    async getTransactionByTitle (title: string){
      const transaction = await this.prismaService.transaction.findMany({
        where:{
          title: {contains: title, mode: 'insensitive'}
        }
      });

      return transaction;
    }

    async updateTransaction(id: string, data: UpdateTransactionDto){
      const transaction = await this.prismaService.transaction.update({
        where: {id: id},
        data: data});

      return transaction;
    }

    async deleteTransaction(id: string){
      const transaction = await this.prismaService.transaction.delete({
        where:{id: id}});

      return transaction;
    }
}
