// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import React from 'react';
import { AttachmentMetadata } from '../types/Attachment';
import { _AttachmentDownloadCards } from './AttachmentDownloadCards';
import { render, screen } from '@testing-library/react';
import { registerIcons } from '@fluentui/react';

describe('FileDownloadCards should be rendered properly', () => {
  beforeEach(() => {
    registerIcons({
      icons: {
        downloadfile: <></>,
        docx24_svg: <></>,
        editboxcancel: <></>
      }
    });
  });

  it('should render if it is FileSharingMetadata', async () => {
    const attachment: AttachmentMetadata = {
      name: 'MockAttachmentCard',
      extension: 'docx',
      url: 'mockUrl',
      id: 'mockId'
    };

    const props = {
      userId: 'MockUserId',
      attachments: [attachment]
    };
    renderFileDownloadCardsWithDefaults(props);
    const card = await screen.findByText('MockAttachmentCard');
    expect(card).toBeDefined();
  });
});

const renderFileDownloadCardsWithDefaults = (props: MockDownloadCardProps): void => {
  render(<_AttachmentDownloadCards {...props} />);
};

interface MockDownloadCardProps {
  userId: string;
  attachments: AttachmentMetadata[];
}
