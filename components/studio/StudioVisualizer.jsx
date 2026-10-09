'use client';

import { useEffect, useState } from 'react';
import Mark from '@/components/ui/Mark';
import SiteLink from '@/components/ui/SiteLink';
import { ArrowRight } from '@/components/ui/icons';
import { VISUALIZER_COPY, VISUALIZER_PATH } from '@/data/roofVisualizer';
import RoofDemo from '@/components/visualizer/RoofDemo';
import VisualizerGate, { savedPass } from '@/components/visualizer/VisualizerGate';

// The home page section for the Roof Visualizer: the animated example beside the sign-up (name and email), which opens the tool. A visitor who has
// already signed up on this device sees a button instead.
export default function StudioVisualizer() {
  const [member, setMember] = useState(false);
  useEffect(() => setMember(Boolean(savedPass())), []);
  return (
    <section className="st-section st-viz" id="roof-visualizer">
      <div className="container">
        <div className="viz-home">
          <div>
            <p className="st-label">{VISUALIZER_COPY.label}</p>
            <h2><Mark text={VISUALIZER_COPY.heading} /></h2>
            <p className="viz-hint">{VISUALIZER_COPY.sub}</p>
            <div style={{ marginTop: 24 }}>
              {member ? (
                <SiteLink className="btn btn-gold" href={VISUALIZER_PATH}>Open the visualizer <ArrowRight /></SiteLink>
              ) : (
                <VisualizerGate redirect compact />
              )}
            </div>
          </div>
          <RoofDemo />
        </div>
      </div>
    </section>
  );
}
