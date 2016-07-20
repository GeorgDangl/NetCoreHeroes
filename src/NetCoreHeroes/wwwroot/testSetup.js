// MockBackend does have trouble with umd packages, see https://github.com/angular/angular/issues/9170#issuecomment-229947428 for more info
// Therefore, systemjs is set to packageWithIndex when running unit tests
System.packageWithIndex = true;