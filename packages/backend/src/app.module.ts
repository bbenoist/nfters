import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join as joinPath } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModelModule } from './model/model.module';
import { ResolversModule } from './resolvers/resolvers.module';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/nfters';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: joinPath(process.cwd(), 'src/schema.gql'),
    }),
    MongooseModule.forRoot(MONGO_URL),
    ModelModule,
    ResolversModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
