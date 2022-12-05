import { Grid, Badge } from "@nextui-org/react";
import Link from "next/link";

export function Footer() {
  return (
    <footer>
      <Grid.Container gap={2} justify="center">
        <Grid>
          <Badge>
            <Link href="https://xkcd.com/">All comics by xkcd</Link>
          </Badge>
        </Grid>
      </Grid.Container>
    </footer>
  );
}
