import buoyancy from './buoyancy.js';
import expansion from './expansion.js';
import vdg from './vdg.js';
import circuit from './circuit.js';
import rc from './rc.js';
import ohm from './ohm.js';
import wire from './wire.js';
import network from './network.js';
import { kcl, kvl } from './kirchhoff.js';
import mirror from './mirror.js';
import { hydraulic, heatcurve, coulomb, efield, potential } from './mod_a.js';
import { capacitor, drift, magforce, induction, snell } from './mod_b.js';

export const VISUALS = { buoyancy, expansion, vdg, circuit, rc, ohm, wire, network, kcl, kvl, mirror, hydraulic, heatcurve, coulomb, efield, potential, capacitor, drift, magforce, induction, snell };
