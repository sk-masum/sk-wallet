import { NextResponse } from 'next/server';

import { ENTITY_FORM_FIELD_METADATA, isSupportedFormEntity } from '@/constants/form/field-metadata';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const entity = searchParams.get('entity');

  if (!entity) {
    return NextResponse.json({ data: ENTITY_FORM_FIELD_METADATA });
  }

  if (!isSupportedFormEntity(entity)) {
    return NextResponse.json(
      {
        error: 'Invalid entity. Use one of: card, credential, document',
      },
      { status: 400 },
    );
  }

  return NextResponse.json({ data: ENTITY_FORM_FIELD_METADATA[entity] });
}
