import { GET } from "../route";
import { MedusaRequest, MedusaResponse } from "@medusajs/framework";

// Mocking MedusaRequest and MedusaResponse
const mockRequest = {} as MedusaRequest;
const mockResponse = {
  sendStatus: jest.fn()
} as unknown as MedusaResponse;

// Test Scenario: Test that the GET function sends a 200 status code when invoked with valid MedusaRequest and MedusaResponse objects.
describe('GET function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send a 200 status code', async () => {
    await GET(mockRequest, mockResponse);
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
  });
});