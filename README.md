# Console Master

A collections of utilities for formatting and coloring console text.

The collection is based on the documentation from [this](https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797) document.

To use Console Master in your project, add it to your project with `deno add "jsr:@aurellis/console-master"`, then import it with the JSR specifier.

```ts
import * as cm from "@aurellis/console-master";

console.log(cm.color.fg.red + "This is in red!" + cm.reset);
```
