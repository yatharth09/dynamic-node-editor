import { BaseNode } from "./baseNode";

export const DatabaseNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Database"
      fields={[
        {
          name: "connectionString",
          label: "Connection",
          type: "text",
          defaultValue: data?.connectionString || "localhost:5432",
          dataKey: "connectionString",
        },
        {
          name: "query",
          label: "Query",
          type: "text",
          defaultValue: data?.query || "SELECT * FROM table",
          dataKey: "query",
        },
        {
          name: "databaseType",
          label: "Database Type",
          type: "select",
          defaultValue: data?.databaseType || "postgresql",
          dataKey: "databaseType",
          options: [
            { value: "postgresql", label: "PostgreSQL" },
            { value: "mysql", label: "MySQL" },
            { value: "mongodb", label: "MongoDB" },
            { value: "sqlite", label: "SQLite" },
          ],
        },
      ]}
      handles={[
        {
          type: "source",
          position: "left",
          id: `${id}-trigger`,
        },
        {
          type: "source",
          position: "right",
          id: `${id}-result`,
        },
      ]}
    />
  );
};
