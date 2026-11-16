# Apuntes de Angular

Basados en los temas 4, 5, 6 y 7 de Desarrollo Web en Entorno Cliente y en las dos recetas de formularios. Cada apartado lleva un ejemplo corto.

## Índice

1. Qué es Angular
2. Crear un proyecto
3. Componentes
4. Ciclo de vida de un componente
5. Estilos
6. Data binding
7. Eventos
8. Comunicación entre componentes (@Input y @Output)
9. Signals
10. Directivas de atributo
11. Control flow: @if, @switch y @for
12. Crear una directiva propia
13. Inyección de dependencias y servicios
14. Formularios template-driven
15. Formularios reactivos
16. Validaciones
17. Chuleta de comandos

---

## 1. Qué es Angular

Framework front-end de Google basado en TypeScript, pensado para hacer SPA (Single Page Application). Una SPA carga HTML, CSS y JS una sola vez y después solo pide al servidor los datos que cambian, así que no recarga la página entera al moverse entre secciones.

AngularJS (la versión 1) y Angular 2 en adelante son cosas distintas. Al buscar información en internet hay que comprobar de cuál de las dos se habla. Estos apuntes son de Angular 2+ (el temario menciona la versión 18).

Piezas de una aplicación:

- Módulos (`@NgModule`): agrupan componentes relacionados. Hasta la versión 17 eran obligatorios, con un módulo raíz `AppModule`.
- Componentes: las vistas. Un componente es template + metadatos + clase.
- Templates: el HTML (y el CSS) del componente.
- Decoradores: funciones que se ponen delante de una clase o propiedad y le dan configuración (`@Component`, `@Input`, `@Injectable`...). Son los metadatos.
- Data binding: la forma de comunicar la clase TypeScript con el template.

## 2. Crear un proyecto

Se necesita Node.js y la herramienta Angular CLI.

```bash
# instalar el CLI (una vez)
npm install -g @angular/cli

# crear el proyecto
ng new mi-proyecto
```

Durante `ng new` pregunta si queremos routing y qué formato de estilos usar (CSS, SCSS, Sass o Less). Esa decisión se toma aquí porque después los ficheros de estilos de todos los componentes tendrán esa extensión.

Ademas le instalaremos bootstrap

```bash
  cd mi-proyecto
  npm install bootstrap
```

Y en el archivo angular.json hay que añadir:

```json
  "styles": [
    "src/styles.css",
    "node_modules/bootstrap/dist/css/bootstrap.min.css"
  ],
  "scripts": [
    "node_modules/bootstrap/dist/js/bootstrap.min.js"
  ]
```

Arrancar la aplicación:

```bash
ng serve -o      # -o abre el navegador. Por defecto en http://localhost:4200
```

Estructura básica (lo importante está dentro de `src`):

```text
src/
  app/
    components/          (carpeta que creamos nosotros)
    services/            (idem)
    app.component.ts     componente principal
    app.component.html
    app.component.css
    app.component.spec.ts
    app.module.ts        solo si el proyecto usa módulos
    app-routing.module.ts
  assets/
  index.html
  main.ts
  styles.css             estilos globales
angular.json             configuración del proyecto
```

## 3. Componentes

En Angular todo es un componente. Una aplicación es un árbol de componentes con uno principal (`app-root`) del que cuelgan los demás.

### Crearlo

```bash
ng generate component components/primer-componente --skip-tests
# forma corta
ng g c components/primer-componente
```

`--skip-tests` evita que se genere el fichero `.spec.ts` (tests unitarios).

Genera hasta cuatro ficheros:

- `.html`: la vista.
- `.css`: estilos solo de este componente.
- `.ts`: la clase, con la lógica.
- `.spec.ts`: tests unitarios (opcional).

### Partes del `.ts`

```ts
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-primer-componente",
  templateUrl: "./primer-componente.component.html",
  styleUrls: ["./primer-componente.component.css"],
})
export class PrimerComponenteComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
```

- `selector`: la etiqueta con la que se usa el componente en otro HTML. En minúsculas y con guiones.
- `template` / `templateUrl`: el HTML en línea (con comillas invertidas) o un fichero aparte.
- `styles` / `styleUrls`: igual, pero para el CSS. `styleUrls` es un array, así que puede haber varias hojas.

Ejemplo con todo en línea (solo recomendable para componentes muy pequeños, se vuelve ilegible enseguida):

```ts
@Component({
  selector: "app-saludo",
  template: `<h1>Hola Angular</h1>`,
  styles: [
    `
      h1 {
        color: green;
      }
    `,
  ],
})
export class SaludoComponent {}
```

### Anidar componentes (padre e hijo)

Se mete la etiqueta del hijo en el HTML del padre:

```html
<!-- app.component.html -->
<section>
  <app-primer-componente></app-primer-componente>
</section>
```

Si el proyecto usa módulos, el hijo tiene que estar en `declarations` del módulo (el CLI lo hace solo, pero conviene comprobarlo):

```ts
@NgModule({
  declarations: [AppComponent, PrimerComponenteComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Módulos y standalone

`@NgModule` tiene cinco propiedades principales:

- `declarations`: componentes, pipes y directivas del módulo.
- `exports`: lo que se ve desde otros módulos.
- `imports`: otros módulos que necesita este.
- `providers`: servicios del módulo.
- `bootstrap`: el componente principal.

Desde Angular 17 se potencian los componentes standalone, que no necesitan módulo. Cada uno declara sus propias dependencias en `imports`:

```ts
@Component({
  selector: "app-ejemplo",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./ejemplo.component.html",
})
export class EjemploComponent {}
```

Esto importa para el resto de apuntes: donde se dice "importar `FormsModule` en el módulo", en un componente standalone se pone en el `imports` del propio componente. Según la versión de Angular puede hacer falta escribir `standalone: true` o venir ya por defecto, y el CLI lo genera solo.

## 4. Ciclo de vida de un componente

Métodos que Angular ejecuta solo en momentos concretos. Orden:

1. `constructor`
2. `ngOnChanges`
3. `ngOnInit`
4. `ngDoCheck`
5. `ngAfterContentInit`
6. `ngAfterContentChecked`
7. `ngAfterViewInit`
8. `ngAfterViewChecked`
9. `ngOnDestroy`

Los que se usan casi siempre:

- `constructor`: inicializa propiedades e inyecta dependencias. Nada pesado.
- `ngOnChanges`: salta cuando cambia un valor que le llega al componente por `@Input`. Solo detecta cambios de primer nivel, no los que se hagan dentro de un objeto.
- `ngOnInit`: una sola vez, tras el primer `ngOnChanges`. Aquí van las tareas costosas, como pedir datos a un servicio.
- `ngDoCheck`: comprobación personalizada, útil para objetos y arrays. No abusar, afecta al rendimiento.
- `ngOnDestroy`: limpieza. Liberar recursos y evitar fugas de memoria.

```ts
export class EjemploComponent implements OnInit, OnChanges, OnDestroy {
  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      const chng = changes[propName];
      console.log(
        `${propName}: ${chng.currentValue} (antes ${chng.previousValue})`,
      );
    }
  }

  ngOnInit(): void {
    // cargar datos aquí, no en el constructor
  }

  ngOnDestroy(): void {
    // cancelar suscripciones, limpiar temporizadores...
  }
}
```

## 5. Estilos

- El CSS de cada componente (`.component.css`) solo afecta a ese componente, aunque sea hijo de otro. Se pueden repetir nombres de clase en componentes distintos sin que choquen.
- `src/styles.css` es la hoja global. Lo que se ponga ahí afecta a todos.

### Usar Sass/SCSS

Se elige al crear el proyecto (`ng new`). A partir de ahí todos los ficheros de estilo son `.scss` y el compilador de Angular los pasa a CSS.

Para tener parciales (`_variables.scss`, `_layout.scss`) accesibles desde cualquier componente, se indica la carpeta en `angular.json`:

```json
"styles": [
  "src/styles.css"
],
"scripts": [],
"stylePreprocessorOptions": {
  "includePaths": ["assets/partials"]
}
```

## 6. Data binding

Hay tres sentidos de comunicación:

| Sentido          | Herramientas                                   |
| ---------------- | ---------------------------------------------- |
| Componente → DOM | Interpolación, property binding, class binding |
| DOM → componente | Event binding, `$event`                        |
| Los dos sentidos | `[(ngModel)]` (necesita `FormsModule`)         |

Las propiedades de la clase se declaran sin `let`, `var` ni `const`, con su tipo, y hay que inicializarlas en la declaración o en el constructor (con `this`).

```ts
export class PrimerComponenteComponent {
  titulo: string;
  numero: number = 2;
  ruta: string = "http://www.google.es";
  color: string = "rojo";
  stock: boolean = true;

  constructor() {
    this.titulo = "Título del componente";
  }

  getParrafo(): string {
    return "Este párrafo viene de una función";
  }
}
```

### Interpolación `{{ }}`

Pinta valores de propiedades o resultados de métodos. Dentro se puede poner JavaScript válido, menos asignaciones, creación de variables, expresiones encadenadas e incrementos o decrementos.

```html
<h1>{{ titulo }}</h1>
<p>{{ numero * 2 }}</p>
<p>{{ getParrafo() }}</p>
```

### Contenido con HTML: `[innerHTML]`

La interpolación muestra las etiquetas como texto. Para que el navegador las interprete:

```ts
parrafo = "En un lugar de la <strong>mancha</strong>";
```

```html
<p>{{ parrafo }}</p>
<!-- se ven las etiquetas escritas -->
<p [innerHTML]="parrafo"></p>
<!-- se interpreta el HTML -->
```

### Property binding `[atributo]`

Enlaza un atributo HTML con una propiedad o expresión del componente. Sin los corchetes, lo de entre comillas se toma como texto literal.

```html
<a [href]="ruta">Ir a Google</a> <img [src]="urlImagen" [alt]="descripcion" />
```

Vale para cualquier atributo (`src`, `alt`, `id`, `title`...). La documentación oficial recomienda los corchetes frente a `href="{{ ruta }}"`.

### Class binding

Una clase entera desde una propiedad:

```html
<a [href]="ruta" [class]="color">Ir a Google</a>
```

O activar una clase concreta según un booleano:

```html
<a [href]="ruta" [class.rojo]="stock">Ir a Google</a>
```

```css
.rojo {
  color: red;
}
```

### Two way data binding `[(ngModel)]`

La propiedad y el input se actualizan entre sí. Requiere `FormsModule`.

```html
<input [(ngModel)]="textoInput" />
<h2>{{ textoInput }}</h2>
```

```ts
textoInput: string = "Hola con la variable iniciada";
```

Si se cambia la variable, cambia el input. Si el usuario escribe, cambia la variable.

### Detección de cambios: `changeDetection`

Esto no sale en los PDFs. Es lo que decide cuándo Angular vuelve a revisar un componente y repinta su HTML cuando cambian los datos. Se configura en el decorador:

```ts
import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-primer-componente",
  templateUrl: "./primer-componente.component.html",
  styleUrls: ["./primer-componente.component.css"],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class PrimerComponenteComponent {}
```

Hay dos estrategias:

- `Eager`: el componente se revisa cada vez que Angular hace una pasada de detección de cambios, sin condiciones. Es el comportamiento clásico, el que hace que `this.items = data` dentro de un `subscribe()` actualice la pantalla sin más.
- `OnPush`: solo se revisa cuando cambia un `@Input`, cuando salta un evento del propio componente, cuando cambia un signal usado en la plantilla o cuando se avisa a mano con `markForCheck()`. Rinde mejor, pero si se cambia una propiedad "a pelo" desde un callback asíncrono, el HTML puede no actualizarse.

`Eager` es el antiguo `ChangeDetectionStrategy.Default` con otro nombre. Apareció en Angular 21.2 como alias y `Default` quedó marcado como obsoleto. En Angular 22 el valor por defecto de los componentes pasó a ser `OnPush`, y la migración de `ng update` añade `changeDetection: ChangeDetectionStrategy.Eager` a los componentes que no especificaban nada, para que sigan funcionando como antes. Si esa línea apareció en vuestro proyecto de ejemplo sin que la escribierais, lo más probable es que venga de ahí o del generador de componentes. No lo puedo comprobar sin ver el proyecto.

Resumido: con `Eager` el HTML se actualiza como en los ejemplos de estos apuntes. Con `OnPush`, conviene usar signals o `@Input` para los datos que se pintan.

## 7. Eventos

Se pone el nombre del evento sin el "on" entre paréntesis y se llama a un método de la clase.

```html
<button (click)="hacerClick()">Púlsame</button>
```

```ts
hacerClick() {
  alert('Has hecho click en el botón');
}
```

Otros eventos se usan igual: `(mouseover)`, `(keydown)`, `(submit)`...

### Recoger varios inputs en un objeto

Combinando `ngModel` y un evento:

```html
<input type="text" [(ngModel)]="alumno.nombre" placeholder="Nombre" />
<input type="number" [(ngModel)]="alumno.edad" placeholder="Edad" />
<button (click)="capturarDatos()">Enviar</button>
```

```ts
alumno: any;

constructor() {
  this.alumno = { nombre: '', edad: 0 };
}

capturarDatos() {
  console.log(this.alumno);
}
```

### `$event`

Se pasa al método y trae la información del evento. Lo más útil es `target`, que es el elemento del DOM que lo lanzó.

```html
<button (click)="capturarDatos($event)">Púlsame</button>
```

```ts
capturarDatos($event: any) {
  console.log($event.target.innerText);   // texto del botón
}
```

En eventos de teclado trae el código de la tecla (`$event.keyCode`).

## 8. Comunicación entre componentes

Tres casos:

- Padre a hijo: `@Input`.
- Hijo a padre: `@Output` con un `EventEmitter`.
- Componentes sin relación directa: un servicio (apartado 13).

### `@Input`: del padre al hijo

En el hijo:

```ts
import { Component, Input } from "@angular/core";

export class HijoComponent {
  @Input() texto: string = "";
}
```

```html
<!-- html del hijo -->
<p>{{ texto }}</p>
```

En el padre, se pasa el valor con corchetes. Si es un texto fijo, va entre comillas simples dentro de las dobles:

```html
<app-hijo [texto]="'Una cadena que viene del padre'"></app-hijo>
<app-hijo [texto]="miVariableDelPadre"></app-hijo>
```

Se puede dar un alias al input. En ese caso, el padre usa el alias, pero dentro del HTML del hijo se sigue usando el nombre de la propiedad:

```ts
@Input('miTexto') texto: string = '';
```

```html
<app-hijo [miTexto]="'Hola'"></app-hijo>
```

### `@Output`: del hijo al padre

En el hijo se crea un `EventEmitter` y un método que emite:

```ts
import { Component, EventEmitter, Output } from "@angular/core";

export class HijoComponent {
  @Output() delete = new EventEmitter();

  onDelete(numero: number) {
    this.delete.emit(numero);
  }
}
```

```html
<!-- html del hijo -->
<button (click)="onDelete(5)">Enviar número</button>
```

En el padre, el evento se llama igual que el output y el valor llega en `$event`:

```html
<app-hijo (delete)="handleDeleteFather($event)"></app-hijo>
```

```ts
handleDeleteFather($event: any) {
  console.log($event);   // 5
}
```

## 9. Signals

Un signal es un valor reactivo: cuando cambia, todo lo que depende de él se actualiza solo, sin suscripciones como en los observables. En el temario aparecen como developer preview en Angular 18, así que puede haber cambios según la versión.

```ts
import { signal } from "@angular/core";

const contador = signal(0);

console.log(contador()); // 0. Se lee llamándolo como una función
contador.set(5);
console.log(contador()); // 5
```

En la plantilla también se lee con paréntesis:

```html
<p>{{ contador() }}</p>
```

### Input signals

Alternativa reactiva a `@Input`. Se declaran con la función `input`:

```ts
import { Component, input } from "@angular/core";

export class MiComp {
  firstName = input<string>(); // opcional, puede ser undefined
  age = input(0); // opcional con valor inicial
  lastName = input.required<string>(); // obligatorio
}
```

## 10. Directivas de atributo

Cambian el aspecto o el comportamiento de un elemento. Son `ngClass`, `ngStyle` y `ngModel` (esta última ya vista).

### `ngStyle`

Recibe un objeto con estilos. Los valores pueden ser fijos o venir de la clase.

```html
<p [ngStyle]="{'color': 'blue', 'font-size': '12px', 'font-weight': 'bold'}">
  Texto
</p>
<p [ngStyle]="paragStyles">Texto</p>
```

```ts
paragStyles = {
  color: "red",
  "font-size": "14px",
};
```

### `ngClass`

Asigna clases CSS (que deben existir en el CSS del componente). Tres formas:

```html
<!-- 1. Array de clases -->
<p [ngClass]="['textoRojo', 'fondoAzul']">Texto</p>

<!-- 2. String (la menos recomendable, es casi una clase normal) -->
<p [ngClass]="'texto-negrita verde'">Texto</p>

<!-- 3. Objeto: cada clase se activa según un booleano -->
<p [ngClass]="{'fondoRojo': activo, 'fondoAzul': !activo}">Texto</p>
<button (click)="cambiarActivo()">Cambiar</button>
```

```ts
activo: boolean = false;

cambiarActivo() {
  this.activo = !this.activo;
}
```

La del objeto es la más útil porque permite activar o desactivar clases según el estado de la clase TypeScript.

## 11. Control flow: @if, @switch y @for

Sintaxis nueva desde Angular 17. Las directivas antiguas `*ngIf`, `*ngFor` y `*ngSwitch` siguen funcionando.

### `@if`

Añade o quita una parte del DOM según una condición. Quitar no es lo mismo que ocultar con CSS: al quitarlo, el componente se destruye, deja de recibir eventos y de usar recursos (y regenerarlo luego cuesta). Con `display: none` sigue vivo.

```html
@if (a > b) {
<p>{{ a }} es mayor que {{ b }}</p>
} @else if (b > a) {
<p>{{ a }} es menor que {{ b }}</p>
} @else {
<p>{{ a }} es igual a {{ b }}</p>
}
```

Se puede guardar el resultado de la expresión en una variable:

```html
@if (user.profile.settings.startDate; as startDate) { {{ startDate }} }
```

### `@switch`

Compara con `===`, no tiene fallthrough (no hace falta `break`) y el `@default` es opcional.

```html
@switch (userPermissions) { @case ('admin') {
<app-admin-dashboard />
} @case ('editor') {
<app-editor-dashboard />
} @default {
<app-viewer-dashboard />
} }
```

### `@for`

Recorre una colección. `track` es obligatorio: le dice a Angular cómo relacionar cada dato con su nodo del DOM para tocar lo mínimo cuando los datos cambian.

```html
@for (item of items; track item.id) {
<li>{{ item.name }}</li>
} @empty {
<li>No hay elementos</li>
}
```

Qué poner en `track`:

- Una propiedad única, normalmente `id` o `uuid`. Es lo ideal.
- `$index`, solo para colecciones estáticas que no cambian.
- `identity`, si no hay otra opción. Es lo más lento y conviene evitarlo.

Variables disponibles dentro del bucle: `$count`, `$index`, `$first`, `$last`, `$even`, `$odd`. Se les puede poner alias:

```html
@for (item of items; track item.id; let idx = $index, e = $even) {
<p>Item #{{ idx }}: {{ item.name }}</p>
}
```

## 12. Crear una directiva propia

```bash
ng g directive color
```

```ts
import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[neoColor]",
})
export class ColorDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.color = "red";
  }
}
```

Se usa como un atributo:

```html
<p neoColor>Contenido</p>
```

El `selector` usa sintaxis CSS. Con `.neoColor` se aplicaría como clase (`<p class="neoColor">`).

`ElementRef` da acceso al elemento del DOM a través de `nativeElement`. Eso asume que se ejecuta en un navegador. Para que funcione también en otras plataformas (servidor con Node, móvil) se usa el renderer. El temario lo muestra con `Renderer`, pero esa clase está obsoleta y la actual es `Renderer2`:

```ts
import { Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({ selector: "[neoColor]" })
export class ColorDirective {
  constructor(el: ElementRef, renderer: Renderer2) {
    renderer.setStyle(el.nativeElement, "color", "red");
  }
}
```

## 13. Inyección de dependencias y servicios

Las clases no crean sus dependencias, las reciben de fuera. El componente pide lo que necesita en el constructor y Angular se lo da. Una dependencia puede ser un servicio, una función o un valor. El caso típico es un servicio.

Crear un servicio:

```bash
ng generate service services/clientes --skip-tests
```

```ts
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root", // disponible en toda la aplicación
})
export class ClientesService {
  private colores: any[] = ["blue", "red", "violet", "yellow", "green"];

  constructor() {}

  getColores(): any[] {
    return this.colores;
  }
}
```

La propiedad es privada, así que la única forma de leerla desde fuera es un método (un getter).

Usarlo en un componente: se importa y se pone como parámetro privado del constructor.

```ts
import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({ ... })
export class PrimerComponenteComponent implements OnInit {
  arrayColores: any[] = [];

  constructor(private clientesService: ClientesService) { }

  ngOnInit(): void {
    this.arrayColores = this.clientesService.getColores();
  }
}
```

```html
@for (color of arrayColores; track color) {
<p>{{ color }}</p>
}
```

El mismo servicio se puede inyectar en cualquier componente. Por eso sirve también para comunicar componentes que no son padre e hijo, y más adelante para hacer peticiones HTTP.

## 14. Formularios template-driven

Todo se define en el HTML. Es la opción rápida y sencilla. También es la que usa `ngModel`.

Receta:

1. Importar `FormsModule` en el módulo o en el componente standalone.
2. Maquetar el `<form>`.
3. Ponerle una variable de plantilla igualada a `ngForm`: `#nombreForm="ngForm"`.
4. Evento `(ngSubmit)` que llama a una función pasándole obligatoriamente `nombreForm.value`.
5. Cada campo lleva `name="..."` y `ngModel`.
6. La función recibe un objeto JSON con una clave por cada `name`.

```html
<form
  novalidate
  #nuevaPersonaForm="ngForm"
  (ngSubmit)="onSubmit(nuevaPersonaForm.value)"
>
  <input type="text" name="nombre" ngModel />
  <input type="number" name="edad" ngModel />
  <button type="submit">Enviar</button>
</form>
```

```ts
onSubmit(values: any) {
  console.log(values);   // { nombre: '...', edad: ... }
}
```

## 15. Formularios reactivos (model-driven)

El formulario se define en la clase del componente. Es más potente que el template: permite reglas de validación, reaccionar a cambios y hacer tests unitarios con más facilidad. Es la opción recomendada. Lo malo es que se tarda más en montar.

Receta:

1. Importar `ReactiveFormsModule` (en el módulo o en el componente standalone). Pueden convivir con `FormsModule` si hace falta.
2. En el `<form>`, atributo `[formGroup]` con el nombre del formulario. Crear la propiedad en el `.ts`.
3. Maquetar el formulario.
4. Evento `(ngSubmit)` que llama a una función **sin parámetros**.
5. Cada campo lleva solo `formControlName` con el nombre del campo.
6. En el `.ts`, crear el `FormGroup` dando de alta cada campo como un `FormControl`.

Se trabaja con dos objetos: `FormGroup` (el grupo) y `FormControl` (cada campo).

```ts
import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

export class PrimerComponenteComponent {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      nombre: new FormControl(""),
      apellidos: new FormControl(""),
      edad: new FormControl(""),
      direccion: new FormControl(""),
    });
  }

  onSubmit() {
    console.log(this.form.value); // objeto con una clave por cada control
  }
}
```

```html
<form novalidate [formGroup]="form" (ngSubmit)="onSubmit()">
  <input type="text" formControlName="nombre" />
  <input type="text" formControlName="apellidos" />
  <input type="text" formControlName="edad" />
  <input type="text" formControlName="direccion" />
  <button type="submit">Enviar</button>
</form>
```

Cuál elegir, resumido:

|                    | Template               | Reactive                    |
| ------------------ | ---------------------- | --------------------------- |
| Se define en       | el HTML                | la clase                    |
| Módulo             | `FormsModule`          | `ReactiveFormsModule`       |
| Campo              | `name` + `ngModel`     | `formControlName`           |
| Submit             | `onSubmit(form.value)` | `onSubmit()` sin parámetros |
| Validación y tests | limitado               | mucho más cómodo            |

## 16. Validaciones

### Validadores de Angular

Están en la clase `Validators`. Se pasan como segundo parámetro del `FormControl`, en un array (puede haber los que se quiera por campo).

```ts
import { FormControl, FormGroup, Validators } from "@angular/forms";

this.form = new FormGroup({
  nombre: new FormControl("", [Validators.pattern("[\\w\\-\\s\\/]+")]),
  apellidos: new FormControl(""),
  edad: new FormControl("", [Validators.required]),
  direccion: new FormControl(""),
});
```

Angular pone al campo la clase CSS `ng-invalid` cuando falla y `ng-valid` cuando está bien. Lo que no hace es bloquear el envío: eso lo tiene que controlar el desarrollador, por ejemplo así:

```html
<button type="submit" [disabled]="!form.valid">Enviar</button>
```

### Validadores personalizados

Una función que recibe el control y devuelve `null` si es correcto, o un objeto con el error si no lo es.

```ts
edadValidator(control: AbstractControl) {
  if (control.value.trim().length === 0) return null;

  const edad = parseInt(control.value);
  if (edad >= 18 && edad <= 65) {
    return null;
  }
  return { message: 'La edad debe estar entre 18 y 65' };
}
```

Se mete en el array de validadores del campo:

```ts
edad: new FormControl("", [Validators.required, this.edadValidator]);
```

### Expresiones regulares típicas

Se usan con `Validators.pattern`. Hay una diferencia que da guerra:

- Si se le pasa un string, Angular le añade solo `^` al principio y `$` al final. Y las barras invertidas hay que duplicarlas: `'\\d{8}'`.
- Si se le pasa un literal (`/.../`), Angular no añade nada, así que hay que poner `^` y `$` a mano. Aquí se usa esta forma porque se lee mejor.

```ts
export const PATRONES = {
  // 8 números y una letra. Solo comprueba el formato, no que la letra sea la correcta
  dni: /^\d{8}[A-Za-z]$/,

  // X, Y o Z, 7 números y una letra
  nie: /^[XYZxyz]\d{7}[A-Za-z]$/,

  // Letras con tildes, ñ y ü. Admite nombres compuestos y apóstrofos o guiones (María José, D'Angelo, Pérez-Reverte)
  nombre: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:[ '-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/,

  // Formato básico: algo, @, algo, punto, al menos dos letras
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,

  // Teléfono español, con prefijo opcional, sin espacios. Empieza por 6, 7, 8 o 9
  telefono: /^(?:\+34|0034)?[6-9]\d{8}$/,

  // ISBN-10 (el último dígito puede ser X) o ISBN-13 (empieza por 978 o 979). Sin guiones
  isbn: /^(?:\d{9}[\dXx]|97[89]\d{10})$/,

  // Código postal español: provincias del 01 al 52
  codigoPostal: /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/,

  // IBAN español: ES y 22 números, sin espacios
  iban: /^ES\d{22}$/,

  // Nombre de usuario: letras, números y guion bajo, de 3 a 16 caracteres
  usuario: /^[A-Za-z0-9_]{3,16}$/,

  // Contraseña: mínimo 8 caracteres con una minúscula, una mayúscula y un número
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,

  // Fecha dd/mm/aaaa. Solo el formato, acepta cosas como 31/02/2024
  fecha: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,

  // Solo números enteros positivos
  soloNumeros: /^\d+$/,
};
```

Uso en un formulario:

```ts
this.form = new FormGroup({
  dni: new FormControl("", [
    Validators.required,
    Validators.pattern(PATRONES.dni),
  ]),
  nombre: new FormControl("", [
    Validators.required,
    Validators.pattern(PATRONES.nombre),
  ]),
  correo: new FormControl("", [
    Validators.required,
    Validators.pattern(PATRONES.email),
  ]),
  telefono: new FormControl("", [Validators.pattern(PATRONES.telefono)]),
  isbn: new FormControl("", [Validators.pattern(PATRONES.isbn)]),
});
```

Para el error de un patrón, la clave en `errors` es `pattern`:

```html
<div *ngIf="form.controls.dni.errors?.pattern">
  El DNI debe tener 8 números y una letra
</div>
```

Angular tiene además `Validators.email`, que ya valida el formato de un correo sin necesidad de regex. Se puede usar en su lugar.

Una regex solo comprueba la forma. Para el DNI, la letra depende del número (el resto de dividir entre 23), así que eso se comprueba con un validador personalizado, igual que el de la edad:

```ts
dniLetraValidator(control: AbstractControl): ValidationErrors | null {
  const valor = (control.value || '').toUpperCase();
  if (!/^\d{8}[A-Z]$/.test(valor)) return null;   // el formato ya lo avisa el pattern

  const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const letraCorrecta = letras[parseInt(valor.slice(0, 8)) % 23];

  return letraCorrecta === valor[8] ? null : { message: 'La letra del DNI no es correcta' };
}
```

Lo mismo pasa con el ISBN, donde la regex no comprueba el dígito de control, y con la fecha, que acepta días que no existen.

### Mostrar errores

Cada control tiene la propiedad `errors` (es `null` si todo va bien). El `?` evita fallar cuando `errors` es `null`.

```html
<input type="text" formControlName="nombre" />
<div *ngIf="form.controls.nombre.errors?.required">
  El nombre es obligatorio
</div>

<input type="text" formControlName="edad" />
<div *ngIf="form.controls.edad.errors">
  {{ form.controls.edad.errors?.message }}
</div>
```

Con TypeScript estricto puede quejarse de `form.controls.nombre`. En ese caso se usa `form.get('nombre')?.errors` y `form.get('nombre')?.touched`. Con la sintaxis nueva sería `@if (form.get('nombre')?.errors?.['required']) { ... }`.

### Estados del formulario y de los controles

Van por parejas, y se pueden consultar en un control (`form.controls.nombre.dirty`) o en el formulario entero:

| Propiedad   | Significa                            | Opuesta               |
| ----------- | ------------------------------------ | --------------------- |
| `pristine`  | el usuario no ha modificado el valor | `dirty`               |
| `untouched` | el usuario no ha pasado por el campo | `touched`             |
| `valid`     | pasa todos los validadores           | `invalid`             |
| sin enviar  | todavía no se ha hecho submit        | enviado (`submitted`) |

La diferencia entre `touched` y `dirty`: `touched` se activa al poner el foco en un campo y salir de él (con tabulador o clic en otro), aunque no se haya cambiado nada. `dirty` solo se activa si el valor cambió.

Para depurar, se pueden pintar en la plantilla:

```html
<pre>
Dirty -> {{ form.controls.nombre.dirty }}
Touched -> {{ form.controls.nombre.touched }}
Valid -> {{ form.controls.nombre.valid }}
</pre>
```

## 17. Chuleta de comandos

```bash
npm install -g @angular/cli                  # instalar el CLI
ng new nombre                                # crear proyecto
ng serve -o                                  # arrancar y abrir navegador
ng g c components/nombre --skip-tests        # componente
ng g directive nombre                        # directiva
ng g service services/nombre --skip-tests    # servicio
```

Sintaxis de binding de un vistazo:

| Sintaxis                          | Qué hace                   |
| --------------------------------- | -------------------------- |
| `{{ dato }}`                      | interpolación              |
| `[propiedad]="dato"`              | property binding           |
| `[class.nombre]="bool"`           | activar una clase          |
| `(evento)="metodo()"`             | event binding              |
| `[(ngModel)]="dato"`              | two way binding            |
| `[innerHTML]="dato"`              | pintar HTML                |
| `[ngClass]` / `[ngStyle]`         | clases y estilos dinámicos |
| `[formGroup]` / `formControlName` | formulario reactivo        |
| `#f="ngForm"`                     | formulario template        |
