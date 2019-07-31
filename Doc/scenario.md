# Scenario

> this document describes how to implement a scenario

## Introduction

One scenario concists of
a) one menu entry
b) one content element

### Technical background

## How to

Intentation: we want to build a scenario called `Fancy Scenario`.

### Menu entry

Go to `src/web/Scenarios` and create a file called `FancyScenario.cs`.
Open this file and enter the following content

```CSharp
namespace Aitgmbh.Tapio.Developerapp.Web.Scenarios
{
    [Aitgmbh.Tapio.Developerapp.Web.Models.Scenario("fancy-scenario", "Fancy Scenario", "/scenario-fancy", "src/web/src/app/scenario-fancy", "", "http://tapio.one")]
    public sealed class FancyScenario
    {
        // nothing to do here
    }
}
```

Let's rerun the server and browse the app.
Voilà there is the menu entry 😎.
You can click on the menu entry `Fancy Scenario`, however nothing will happens. Except some errors in the developer console 😵. We will fix this in a later step.

### Explanation

Let's take a look a the parameter of the `Scenario` attribute.

```CSharp
[Scenario("fancy-scenario", "Fancy Scenario", "/scenario-fancy", "src/web/src/app/scenario-fancy", "", "http://tapio.one")]
```

#### First parameter

The first parameter is the *id* of the scenario. It is used by the `DocumentationPathController` controller to resolve the correct URLs.

#### Second parameter

The second parameter is the caption of the scenario. It used the text for the menu entry. When you browse the app, you can already how this value affects the app.

#### Third parameter

The third parameter is the *path* of the scenario in the app. It used the href path for the menu entry. It allowes passing the state of the app.

### Fourth parameter

The fourth parameter is the *relative path of the frontend location* of the scenario. It used to generate the link the GitHub code location.

### Fifth parameter

The fifth parameter is the *relative path of the backend location* of the scenario. It used to generate the link the GitHub code location. In this scenario, we do not have a backend, so it's empty.

### Sixth parameter

The sixth parameter is the URL of the tapio documentation of the scenario.

## Routing

The click on the `Fancy Scenario` menu entry produces following error

```plaintext
Error: Uncaught (in promise): Error: Cannot match any routes. URL Segment: 'scenario-fancy'
```

In order to implement everything correctly, we need a route which specifies what should happen if angular finds the route `scenario-fancy`.

So let's create a *module* with activated *routing*.

Execute the command `ng generate module scenario-fancy --routing=true`.
A folder `scenario-fancy` with two files `scenario-fancy.module.ts` and `scenario-fancy-routing.module.ts` will be created.

And let's create a *component* for displaying something.

Execute the command `ng generate component scenario-fancy`. Four files will be created `scenario-fancy.component.ts`, `scenario-fancy.component.spec.ts`, `scenario-fancy.component.html`, and `scenario-fancy.component.css`.

We have to wire everything together.

Open the file `app-routing.module.ts` and adapt the content

```Diff
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'scenario-sample',
        loadChildren: './scenario-sample/scenario-sample.module#ScenarioSampleModule'
-    }
+    },
+    {
+        path: 'scenario-fancy',
+        loadChildren: './scenario-fancy/scenario-fancy.module#ScenarioFancyModule'
+    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

```

This change tells angular if the empty path segment is `scenario-fancy`, delagate the `ScenarioFancyModule` module.

Open the file `scenario-fancy-routing.module.ts` and adapt the content

```Diff
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScenarioFancyComponent } from './scenario-fancy.component';

- const routes: Routes = [];
+ const routes: Routes = [
+    {
+        path: '',
+        component: ScenarioFancyComponent
+    }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScenarioFancyRoutingModule { }
```

This change tells angular if an empty path segment is encountered, use the `ScenarioFancyComponent`.

Reload the app and click on the `Fancy Scenario` menu entry.
🚀 the main content is changed

## Change the component

So that the new component looks like expected, we have to change some little things.

### Import the SharedModule

We need to import the `SharedModule` for the proper look and feel, and behavior.

Change the content of `scenario-fancy.module.ts`

```Diff
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScenarioFancyRoutingModule } from './scenario-fancy-routing.module';
import { ScenarioFancyComponent } from './scenario-fancy.component';
+ import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ScenarioFancyComponent],
  imports: [
    CommonModule,
    ScenarioFancyRoutingModule,
+    SharedModule
  ]
})
export class ScenarioFancyModule { }
```

### Adapt scenario-fancy.component.html

```Diff
+ <app-scenario title="Fancy Scenario" id="fancy-scenario">
<p>
  scenario-fancy works!
</p>
+ </app-scenario>
```

Reload the app and click on the `Fancy Scenario` menu entry.
🤓 the main content is changed with the correct heading and documentation links

Congratulations, you just created your first custom scenario.
