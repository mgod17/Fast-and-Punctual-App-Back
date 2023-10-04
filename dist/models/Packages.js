"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("@typegoose/typegoose");
const Users_1 = __importDefault(require("./Users"));
var PackageStatus;
(function (PackageStatus) {
    PackageStatus["PENDING"] = "pendiente";
    PackageStatus["DELIVERED"] = "entregado";
})(PackageStatus || (PackageStatus = {}));
class Package {
    static deletePackage(packageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PackageModel.findByIdAndDelete(packageId);
        });
    }
}
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Package.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Package.prototype, "recipientName", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Package.prototype, "weightKg", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Date)
], Package.prototype, "date", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Package.prototype, "quantity", void 0);
__decorate([
    (0, typegoose_1.prop)({ enum: PackageStatus, default: PackageStatus.PENDING }),
    __metadata("design:type", String)
], Package.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: Users_1.default }) // Use direct reference
    ,
    __metadata("design:type", Object)
], Package.prototype, "assignedTo", void 0);
const PackageModel = (0, typegoose_1.getModelForClass)(Package);
exports.default = PackageModel;
//# sourceMappingURL=Packages.js.map