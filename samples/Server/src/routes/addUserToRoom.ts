// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as express from 'express';
import { getResourceConnectionString } from '../lib/envHelper';
import { RoomsClient, RoomParticipant, Role } from '@azure/communication-rooms';

const router = express.Router();
interface AddUserToRoomParam {
  userId: string;
  roomId: string;
  role: string;
}

/**
 * route: /addUserToRoom
 *
 * purpose: Add the user to the room with given roomId and role.
 *
 * @param userId: id of the user as string
 * @param roomId: roomId to add user as string
 * @param role: role of user as string
 */

router.post('/', async function (req, res, next) {
  // create RoomsClient
  const roomsClient: RoomsClient = new RoomsClient(getResourceConnectionString());

  const addUserToRoomParam: AddUserToRoomParam = req.body;

  // request payload to add participants
  const addParticipantsList: RoomParticipant[] = [
    {
      id: { communicationUserId: addUserToRoomParam.userId },
      role: addUserToRoomParam.role as Role
    }
  ];

  await roomsClient.addParticipants(addUserToRoomParam.roomId, addParticipantsList);
  res.send(201);
});

export default router;
