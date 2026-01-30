/**
 * Interfaccia di un item usato su giochi con lettere o simboli nascosti.
 */
export interface IHiddenCharItem {
  /** Singola lettera. */
  char: string;
  /** Campo che indica se mostrare la lettera. */
  show: boolean;
}
