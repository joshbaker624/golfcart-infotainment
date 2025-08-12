const EventEmitter = require('events');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

class GPSService extends EventEmitter {
  constructor() {
    super();
    this.port = null;
    this.parser = null;
    this.currentPosition = null;
    this.isConnected = false;
  }

  initialize() {
    console.log('Initializing GPS service...');
    this.connectToGPS();
  }

  async connectToGPS() {
    try {
      // Try to find GPS module (typically on /dev/ttyUSB0 or /dev/ttyAMA0 on Pi)
      const ports = await SerialPort.list();
      const gpsPort = ports.find(p => 
        p.path.includes('ttyUSB') || p.path.includes('ttyAMA')
      );

      if (!gpsPort) {
        console.log('No GPS module found, using mock data');
        this.useMockGPS();
        return;
      }

      this.port = new SerialPort({
        path: gpsPort.path,
        baudRate: 9600
      });

      this.parser = this.port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
      this.parser.on('data', this.parseNMEA.bind(this));
      
      this.isConnected = true;
      console.log('GPS connected on', gpsPort.path);
    } catch (error) {
      console.error('GPS connection error:', error);
      this.useMockGPS();
    }
  }

  useMockGPS() {
    // Simulate GPS updates for development
    setInterval(() => {
      const mockPosition = {
        latitude: 33.7490 + (Math.random() - 0.5) * 0.01,
        longitude: -84.3880 + (Math.random() - 0.5) * 0.01,
        speed: Math.random() * 15, // 0-15 mph
        heading: Math.random() * 360,
        accuracy: 5,
        timestamp: new Date()
      };
      
      this.currentPosition = mockPosition;
      this.emit('position-update', mockPosition);
    }, 1000);
  }

  parseNMEA(data) {
    // Parse NMEA sentences (simplified)
    if (data.startsWith('$GPGGA')) {
      const parts = data.split(',');
      if (parts[2] && parts[4]) {
        this.currentPosition = {
          latitude: this.convertDMSToDD(parts[2], parts[3]),
          longitude: this.convertDMSToDD(parts[4], parts[5]),
          altitude: parseFloat(parts[9]) || 0,
          timestamp: new Date()
        };
        this.emit('position-update', this.currentPosition);
      }
    }
  }

  convertDMSToDD(dms, direction) {
    const degrees = parseInt(dms.substring(0, 2));
    const minutes = parseFloat(dms.substring(2));
    let dd = degrees + minutes / 60;
    
    if (direction === 'S' || direction === 'W') {
      dd = -dd;
    }
    
    return dd;
  }

  getCurrentPosition() {
    return this.currentPosition;
  }

  cleanup() {
    if (this.port && this.port.isOpen) {
      this.port.close();
    }
    this.removeAllListeners();
  }
}

module.exports = { GPSService };