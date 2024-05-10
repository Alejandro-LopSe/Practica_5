import { PageProps } from "$fresh/server.ts";

export default function Layout(props: PageProps) {
  return (
    <div>
      <div class={"header"}>
        <a href="/client/home" method="post">
          Universidad Antonio de Nebrija
        </a>

        <a href="/auth">
          Cerrar Sesion
        </a>
      </div>
      <props.Component></props.Component>
    </div>
  );
}
