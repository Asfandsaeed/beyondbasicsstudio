interface Props {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

export default function SchemaMarkup({ schema }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
