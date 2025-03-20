import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { LoginComponent } from "./core/auth/login/login.component";
import { RegisterComponent } from "./core/auth/register/register.component";
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";

export const routes: Routes = [
	{
		path: "login",
		component: LoginComponent,
	},
	{
		path: "register",
		component: RegisterComponent,
	},
	{
		path: "**",
		component: NotFoundComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
