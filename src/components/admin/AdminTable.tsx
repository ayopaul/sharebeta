"use client";

interface Column {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface AdminTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  onEdit?: (row: Record<string, unknown>) => void;
  onDelete?: (id: string) => void;
}

export default function AdminTable({ columns, data, onEdit, onDelete }: AdminTableProps) {
  return (
    <div style={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #e5e5e5", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #e5e5e5" }}>
            {columns.map((col) => (
              <th key={col.key} style={{ textAlign: "left", padding: "12px 16px", fontSize: "12px", fontWeight: 500, color: "#6f6f6f", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th style={{ textAlign: "right", padding: "12px 16px", fontSize: "12px", fontWeight: 500, color: "#6f6f6f", width: "120px" }}>
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} style={{ padding: "40px 16px", textAlign: "center", color: "#6f6f6f", fontSize: "14px" }}>
                No items yet
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id as string} style={{ borderBottom: "1px solid #f5f4f1" }}>
                {columns.map((col) => (
                  <td key={col.key} style={{ padding: "12px 16px", fontSize: "14px", color: "#0b0c0f" }}>
                    {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "")}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td style={{ padding: "12px 16px", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      {onEdit && (
                        <button onClick={() => onEdit(row)} style={{ padding: "4px 12px", fontSize: "13px", border: "1px solid #e5e5e5", borderRadius: "6px", backgroundColor: "#fff", cursor: "pointer", color: "#0b0c0f" }}>
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => { if (confirm("Delete this item?")) onDelete(row.id as string); }} style={{ padding: "4px 12px", fontSize: "13px", border: "1px solid #ff9e9e", borderRadius: "6px", backgroundColor: "#fff", cursor: "pointer", color: "#ff9e9e" }}>
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
