#!/usr/bin/env bash

npx nx build ngrx-research --configuration=production;

cd apps/firebase;
firebase use ngrx-research;

firebase deploy --only hosting;
