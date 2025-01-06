import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Copy, Check } from 'lucide-react';

const ColorPicker = () => {
  const [color, setColor] = useState({ r: 255, g: 0, b: 0 });
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('rgb');
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const canvasRef = useRef(null);

  // Convert RGB to Hex
  const rgbToHex = (r, g, b) => {
    const toHex = (n) => {
      const hex = Math.round(n).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // Convert RGB to HSL
  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  // Convert HSL to RGB
  const hslToRgb = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return {
      r: Math.round(255 * f(0)),
      g: Math.round(255 * f(8)),
      b: Math.round(255 * f(4))
    };
  };

  const handleCopy = (format) => {
    let colorString;
    switch (format) {
      case 'hex':
        colorString = rgbToHex(color.r, color.g, color.b);
        break;
      case 'rgb':
        colorString = `rgb(${color.r}, ${color.g}, ${color.b})`;
        break;
      case 'hsl':
        const hsl = rgbToHsl(color.r, color.g, color.b);
        colorString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        break;
      default:
        return;
    }
    navigator.clipboard.writeText(colorString);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleHSLChange = () => {
    const newRgb = hslToRgb(hue, saturation, lightness);
    setColor(newRgb);
  };

  const getAverageColor = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let r = 0, g = 0, b = 0;
    const count = data.length / 4;
    
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }
    
    setColor({
      r: Math.round(r / count),
      g: Math.round(g / count),
      b: Math.round(b / count)
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Advanced Color Picker</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Color Preview */}
          <div 
            className="w-full h-24 rounded-lg mb-4"
            style={{ backgroundColor: `rgb(${color.r},${color.g},${color.b})` }}
          />

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="rgb">RGB</TabsTrigger>
              <TabsTrigger value="hsl">HSL</TabsTrigger>
              <TabsTrigger value="picker">Color Picker</TabsTrigger>
            </TabsList>

            <TabsContent value="rgb">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Red</label>
                  <Slider
                    value={[color.r]}
                    min={0}
                    max={255}
                    step={1}
                    onValueChange={(value) => setColor({ ...color, r: value[0] })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Green</label>
                  <Slider
                    value={[color.g]}
                    min={0}
                    max={255}
                    step={1}
                    onValueChange={(value) => setColor({ ...color, g: value[0] })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Blue</label>
                  <Slider
                    value={[color.b]}
                    min={0}
                    max={255}
                    step={1}
                    onValueChange={(value) => setColor({ ...color, b: value[0] })}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hsl">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Hue</label>
                  <Slider
                    value={[hue]}
                    min={0}
                    max={360}
                    step={1}
                    onValueChange={(value) => {
                      setHue(value[0]);
                      handleHSLChange();
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Saturation</label>
                  <Slider
                    value={[saturation]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => {
                      setSaturation(value[0]);
                      handleHSLChange();
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Lightness</label>
                  <Slider
                    value={[lightness]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => {
                      setLightness(value[0]);
                      handleHSLChange();
                    }}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="picker">
              <div className="space-y-4">
                <Input
                  type="color"
                  className="w-full h-12"
                  value={rgbToHex(color.r, color.g, color.b)}
                  onChange={(e) => {
                    const hex = e.target.value;
                    const r = parseInt(hex.slice(1, 3), 16);
                    const g = parseInt(hex.slice(3, 5), 16);
                    const b = parseInt(hex.slice(5, 7), 16);
                    setColor({ r, g, b });
                  }}
                />
                <canvas
                  ref={canvasRef}
                  width="200"
                  height="200"
                  className="border rounded"
                />
                <Button onClick={getAverageColor}>
                  Get Average Color
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Color Values Display */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span>HEX: {rgbToHex(color.r, color.g, color.b)}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy('hex')}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span>RGB: rgb({color.r}, {color.g}, {color.b})</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy('rgb')}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span>
                HSL: hsl({rgbToHsl(color.r, color.g, color.b).h}, 
                {rgbToHsl(color.r, color.g, color.b).s}%, 
                {rgbToHsl(color.r, color.g, color.b).l}%)
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy('hsl')}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorPicker;
