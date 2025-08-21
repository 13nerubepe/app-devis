import { Routes } from '@angular/router';

import { FullComponent } from './app/layouts/full/full.component';
import { HomeComponent } from './app/site-pages/home/home.component';

export const Approutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
   loadComponent: () => import('./app/pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'caisses',
    loadComponent: () => import('./app/pages/caisses/caisses.component').then(m => m.CaissesComponent)
  },
  {
    path: 'admin',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/categories', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./app/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'approvisionnements',
        loadComponent: () => import('./app/pages/approvisionnements/approvisionnements.component').then(m => m.ApprovisionnementsComponent)
      },
      {
        path: 'personnels',
        loadComponent: () => import('./app/pages/user/user.component').then(m => m.UserComponent)
      },
      {
        path: 'clients',
        loadComponent: () => import('./app/pages/client/client.component').then(m => m.ClientComponent)
      },
      {
        path: 'audits',
        loadComponent: () => import('./app/pages/audits/audits.component').then(m => m.AuditsComponent)
      },
      {
        path: 'bilan-finances',
       loadComponent: () => import('./app/pages/bilan-finances/bilan-finances.component').then(m => m.BilanFinancesComponent)
      },
      {
        path: 'bilan-ventes',
        loadComponent: () => import('./app/pages/bilan-ventes/bilan-ventes.component').then(m => m.BilanVenteComponent)
      },
      {
        path: 'caisses',
        loadComponent: () => import('./app/pages/caisses/caisses.component').then(m => m.CaissesComponent)
      },
      {
        path: 'commandes',
        loadComponent: () => import('./app/pages/commandes/commandes.component').then(m => m.CommandesComponent)
      },
      {
        path: 'depenses',
        loadComponent: () => import('./app/pages/depenses/depenses.component').then(m => m.DepensesComponent)
      },
      {
        path: 'destockages',
        loadComponent: () => import('./app/pages/destockages/destockages.component').then(m => m.DestokagesComponent)
      },
      {
        path: 'inventaire',
        loadComponent: () => import('./app/pages/inventaire/inventaire.component').then(m => m.InventaireComponent)
      },
      {
        path: 'presences',
        loadComponent: () => import('./app/pages/presences/presences.component').then(m => m.PresencesComponent)
      },
      {
        path: 'produits',
        loadComponent: () => import('./app/pages/produits/produits.component').then(m => m.ProduitsComponent)
      },
      {
        path: 'categories',
        loadComponent: () => import('./app/pages/categorie/categorie.component').then(m => m.CategorieComponent)
      },
      {
        path: 'proformas',
        loadComponent: () => import('./app/pages/proformas/proformas.component').then(m => m.ProformasComponent)
      },
      {
        path: 'rubriques',
          loadComponent: () => import('./app/pages/rubriques/rubriques.component').then(m => m.RubriquesComponent)
      },
      {
        path: 'ventes',
        loadComponent: () => import('./app/pages/ventes/ventes.component').then(m => m.VentesComponent)
      },
      {
        path: 'point-ventes',
        loadComponent: () => import('./app/pages/point-ventes/point-ventes.component').then(m => m.PointVentesComponent)
      },
      {
        path: 'configuration',
        // loadChildren: () => import('./pages/point-ventes/point-ventes.module').then(m => m.PointVentesModule)
        loadComponent: () => import('./app/pages/configuration/configuration.component').then(m => m.ConfigurationComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
