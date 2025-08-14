import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { HomeComponent } from './site-pages/home/home.component';

export const Approutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
   loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'caisses',
    loadComponent: () => import('./pages/caisses/caisses.component').then(m => m.CaissesComponent)
  },
  {
    path: 'admin',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/categories', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'approvisionnements',
        loadComponent: () => import('./pages/approvisionnements/approvisionnements.component').then(m => m.ApprovisionnementsComponent)
      },
      {
        path: 'personnels',
        loadComponent: () => import('./pages/user/user.component').then(m => m.UserComponent)
      },
      {
        path: 'clients',
        loadComponent: () => import('./pages/client/client.component').then(m => m.ClientComponent)
      },
      {
        path: 'audits',
        loadComponent: () => import('./pages/audits/audits.component').then(m => m.AuditsComponent)
      },
      {
        path: 'bilan-finances',
       loadComponent: () => import('./pages/bilan-finances/bilan-finances.component').then(m => m.BilanFinancesComponent)
      },
      {
        path: 'bilan-ventes',
        loadComponent: () => import('./pages/bilan-ventes/bilan-ventes.component').then(m => m.BilanVenteComponent)
      },
      {
        path: 'caisses',
        loadComponent: () => import('./pages/caisses/caisses.component').then(m => m.CaissesComponent)
      },
      {
        path: 'commandes',
        loadComponent: () => import('./pages/commandes/commandes.component').then(m => m.CommandesComponent)
      },
      {
        path: 'depenses',
        loadComponent: () => import('./pages/depenses/depenses.component').then(m => m.DepensesComponent)
      },
      {
        path: 'destockages',
        loadComponent: () => import('./pages/destockages/destockages.component').then(m => m.DestokagesComponent)
      },
      {
        path: 'inventaire',
        loadComponent: () => import('./pages/inventaire/inventaire.component').then(m => m.InventaireComponent)
      },
      {
        path: 'presences',
        loadComponent: () => import('./pages/presences/presences.component').then(m => m.PresencesComponent)
      },
      {
        path: 'produits',
        loadComponent: () => import('./pages/produits/produits.component').then(m => m.ProduitsComponent)
      },
      {
        path: 'categories',
        loadComponent: () => import('./pages/categorie/categorie.component').then(m => m.CategorieComponent)
      },
      {
        path: 'proformas',
        loadComponent: () => import('./pages/proformas/proformas.component').then(m => m.ProformasComponent)
      },
      {
        path: 'rubriques',
          loadComponent: () => import('./pages/rubriques/rubriques.component').then(m => m.RubriquesComponent)
      },
      {
        path: 'ventes',
        loadComponent: () => import('./pages/ventes/ventes.component').then(m => m.VentesComponent)
      },
      {
        path: 'point-ventes',
        loadComponent: () => import('./pages/point-ventes/point-ventes.component').then(m => m.PointVentesComponent)
      },
      {
        path: 'configuration',
        // loadChildren: () => import('./pages/point-ventes/point-ventes.module').then(m => m.PointVentesModule)
        loadComponent: () => import('./pages/configuration/configuration.component').then(m => m.ConfigurationComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
