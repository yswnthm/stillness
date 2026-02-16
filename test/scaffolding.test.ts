import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Project Scaffolding', () => {
  const designs = ['design1', 'design2', 'design3', 'design4'];

  it('should have the design directories', () => {
    designs.forEach(design => {
      const exists = fs.existsSync(path.resolve(process.cwd(), design));
      expect(exists).toBe(true);
    });
  });

  it('should have a README.md in each design directory', () => {
    designs.forEach(design => {
      const exists = fs.existsSync(path.resolve(process.cwd(), design, 'README.md'));
      expect(exists).toBe(true);
    });
  });

  it('should have an assets directory in each design directory', () => {
    designs.forEach(design => {
      const exists = fs.existsSync(path.resolve(process.cwd(), design, 'assets'));
      expect(exists).toBe(true);
    });
  });
});
