import React, { Component } from "react";
import "./Splash.css";
import { Redirect } from "react-router-dom";

// Direct SVG logo component with internal updated initials and label, animation/styles unchanged
function LoaderLogoSVG({ theme }) {
  return (
    <svg
    className="raw_logo"
    width="50%"
    height="40%"
    viewBox="0 0 440 305"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Interlocking Hexagons */}
    <path
      className="myHexagon"
      d="M293.545 167.405L229.5 204.381C227.025 205.81 223.975 205.81 221.5 204.381L157.455 167.405C154.98 165.976 153.455 163.335 153.455 160.476L153.455 86.5234C153.455 83.6653 154.98 81.0243 157.455 79.5952L221.5 42.6187C223.975 41.1896 227.025 41.1897 229.5 42.6187L293.545 79.5952C296.02 81.0243 297.545 83.6653 297.545 86.5234L297.545 160.476C297.545 163.335 296.02 165.976 293.545 167.405Z"
      stroke={theme.body}
      strokeWidth="4"
    />
    <path
      className="myHexagon"
      d="M147.455 73.5953L211.5 36.6188C213.975 35.1898 217.025 35.1898 219.5 36.6188L283.545 73.5953C286.02 75.0244 287.545 77.6654 287.545 80.5235L287.545 154.477C287.545 157.335 286.02 159.976 283.545 161.405L219.5 198.381C217.025 199.81 213.975 199.81 211.5 198.381L147.455 161.405C144.98 159.976 143.455 157.335 143.455 154.477L143.455 80.5235C143.455 77.6654 144.98 75.0244 147.455 73.5953Z"
      stroke={theme.body}
      strokeWidth="4"
    />
  
    {/* Logo Text: "AB" (Handwritten Path Style) */}
    <path
      className="letter"
      d="M190 132L205 85H215L230 132M200 115H220" 
      stroke={theme.body}
      strokeWidth="3"
    />
    <path
      className="letter"
      d="M240 132V85H255C262 85 265 90 265 98C265 105 260 108 255 108H240M240 108H255C265 108 268 115 268 122C268 132 262 132 255 132H240"
      stroke={theme.body}
      strokeWidth="3"
    />
  
    {/* Name Area: Abdul Rehman */}
    <mask id="path-5-inside-1" fill={theme.body}>
      {/* Kept original mask path to ensure text stays in the correct signature region */}
      <rect x="0" y="230" width="440" height="75" fill="white" />
    </mask>
  
    {/* Individual Paths for "Abdul Rehman" - All keeping original signature classes */}
    <path className="signature1" d="M40 280 L 50 250 L 60 280 M 45 270 H 55" stroke={theme.body} strokeWidth="3" /> {/* A */}
    <path className="signature2" d="M70 280 V 250 C 85 250 85 265 70 265" stroke={theme.body} strokeWidth="3" /> {/* b */}
    <path className="signature3" d="M100 250 V 280 C 85 280 85 265 100 265" stroke={theme.body} strokeWidth="3" /> {/* d */}
    <path className="signature4" d="M110 265 V 275 C 110 285 125 285 125 275 V 265" stroke={theme.body} strokeWidth="3" /> {/* u */}
    <path className="signature5" d="M135 250 V 280" stroke={theme.body} strokeWidth="3" /> {/* l */}
    
    <path className="signature6" d="M160 280 V 250 C 180 250 180 265 160 265 L 180 280" stroke={theme.body} strokeWidth="3" /> {/* R */}
    <path className="signature7" d="M190 280 C 180 280 180 265 190 265 H 200 C 200 255 180 255 180 270" stroke={theme.body} strokeWidth="3" /> {/* e */}
    <path className="signature8" d="M210 250 V 280 M 210 265 C 225 265 225 280 210 280" stroke={theme.body} strokeWidth="3" /> {/* h */}
    <path className="signature9" d="M235 280 V 265 C 235 255 250 255 250 265 V 280 M 250 265 C 250 255 265 255 265 265 V 280" stroke={theme.body} strokeWidth="3" /> {/* m */}
    <path className="signature10" d="M290 280 C 275 280 275 265 290 265 V 280" stroke={theme.body} strokeWidth="3" /> {/* a */}
    <path className="signature11" d="M300 280 V 265 C 300 255 315 255 315 265 V 280" stroke={theme.body} strokeWidth="3" /> {/* n */}
  
    <defs>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .signature1, .signature2, .signature3, .signature4, .signature5, .signature6, 
        .signature7, .signature8, .signature9, .signature10, .signature11, .signature12, 
        .signature13, .signature14, .signature15 {
          stroke-dasharray: 800;
          stroke-dashoffset: 800;
          animation: dash 1s linear forwards;
        }
        
        /* Animation Delays (Staggered exactly like original) */
        .signature1 { animation-delay: 0.5s; }
        .signature2 { animation-delay: 0.7s; }
        .signature3 { animation-delay: 0.9s; }
        .signature4 { animation-delay: 1.1s; }
        .signature5 { animation-delay: 1.3s; }
        .signature6 { animation-delay: 1.5s; }
        .signature7 { animation-delay: 1.7s; }
        .signature8 { animation-delay: 1.9s; }
        .signature9 { animation-delay: 2.1s; }
        .signature10 { animation-delay: 2.3s; }
        .signature11 { animation-delay: 2.5s; }
  
        .letter {
          opacity: 0;
          animation: fadein 2s linear forwards 2.5s;
        }
  
        .myHexagon {
          stroke-dasharray: 800;
          stroke-dashoffset: 800;
          animation: dash 4s linear forwards 0.5s;
        }
  
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
  
        @keyframes fadein {
          to { opacity: 1; }
        }
      `,
        }}
      />
    </defs>
  </svg>
  );
}

function AnimatedSplash(props) {
  return (
    <div className="logo_wrapper">
      <div className="screen" style={{ backgroundColor: props.theme.splashBg }}>
        <div style={{ position: "relative" }}>
          <LoaderLogoSVG theme={props.theme} />
        </div>
      </div>
    </div>
  );
}

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 5500);
  }

  componentWillUnmount() {
    clearTimeout(this.id);
  }

  render() {
    return this.state.redirect ? (
      <Redirect to="/home" />
    ) : (
      <AnimatedSplash theme={this.props.theme} />
    );
  }
}

export default Splash;
