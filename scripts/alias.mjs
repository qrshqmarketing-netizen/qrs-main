// node --import ./scripts/alias.mjs <script>: load site data files that use the '@/…' alias (see alias-hooks.mjs)
import { register } from 'node:module';

register('./alias-hooks.mjs', import.meta.url);
