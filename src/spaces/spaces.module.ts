import { Module } from '@nestjs/common';
import { SpacesController } from './spaces.controller';
import { SpacesService } from './spaces.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Space, SpaceSchema } from './schemas/space.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Space.name, schema: SpaceSchema }]),
    JwtModule.register({
      secret: 'notes',
    }),
  ],
  controllers: [SpacesController],
  providers: [SpacesService],
})
export class SpacesModule {}
