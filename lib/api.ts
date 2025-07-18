export async function $api<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const config: RequestInit = {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization:
        "Bearer b60f25f0d8176ca29811f51b8c3bf50f9a855949e2f35be7eaa0036bc36fe3fd5d3899e2ee6b03551de9c83ea1d123f20763245705b77ca5540a4b3ef9b409fae03066cf5a0f5df20599045f5f75a693197a7ccedca8a39fa60c063ac4cc2c10a3d45ffd1b7f76cbf1389ce6b1eced177f8d6624baf4062e63fd159df61cdd49",
    },
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    config
  ).then((res) => res.json());

  return response as T;
}
